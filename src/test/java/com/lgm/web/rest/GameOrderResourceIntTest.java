package com.lgm.web.rest;

import com.lgm.LittleGreenMenApp;

import com.lgm.domain.GameOrder;
import com.lgm.domain.Actor;
import com.lgm.domain.Turn;
import com.lgm.repository.GameOrderRepository;
import com.lgm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.lgm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.lgm.domain.enumeration.Direction;
/**
 * Test class for the GameOrderResource REST controller.
 *
 * @see GameOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LittleGreenMenApp.class)
public class GameOrderResourceIntTest {

    private static final Direction DEFAULT_DIRECTION = Direction.UP_LEFT;
    private static final Direction UPDATED_DIRECTION = Direction.UP_RIGHT;

    @Autowired
    private GameOrderRepository gameOrderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restGameOrderMockMvc;

    private GameOrder gameOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameOrderResource gameOrderResource = new GameOrderResource(gameOrderRepository);
        this.restGameOrderMockMvc = MockMvcBuilders.standaloneSetup(gameOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameOrder createEntity(EntityManager em) {
        GameOrder gameOrder = new GameOrder()
            .direction(DEFAULT_DIRECTION);
        // Add required entity
        Actor actor = ActorResourceIntTest.createEntity(em);
        em.persist(actor);
        em.flush();
        gameOrder.setActor(actor);
        // Add required entity
        Turn turn = TurnResourceIntTest.createEntity(em);
        em.persist(turn);
        em.flush();
        gameOrder.setTurn(turn);
        return gameOrder;
    }

    @Before
    public void initTest() {
        gameOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameOrder() throws Exception {
        int databaseSizeBeforeCreate = gameOrderRepository.findAll().size();

        // Create the GameOrder
        restGameOrderMockMvc.perform(post("/api/game-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameOrder)))
            .andExpect(status().isCreated());

        // Validate the GameOrder in the database
        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeCreate + 1);
        GameOrder testGameOrder = gameOrderList.get(gameOrderList.size() - 1);
        assertThat(testGameOrder.getDirection()).isEqualTo(DEFAULT_DIRECTION);
    }

    @Test
    @Transactional
    public void createGameOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameOrderRepository.findAll().size();

        // Create the GameOrder with an existing ID
        gameOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameOrderMockMvc.perform(post("/api/game-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameOrder)))
            .andExpect(status().isBadRequest());

        // Validate the GameOrder in the database
        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDirectionIsRequired() throws Exception {
        int databaseSizeBeforeTest = gameOrderRepository.findAll().size();
        // set the field null
        gameOrder.setDirection(null);

        // Create the GameOrder, which fails.

        restGameOrderMockMvc.perform(post("/api/game-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameOrder)))
            .andExpect(status().isBadRequest());

        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGameOrders() throws Exception {
        // Initialize the database
        gameOrderRepository.saveAndFlush(gameOrder);

        // Get all the gameOrderList
        restGameOrderMockMvc.perform(get("/api/game-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].direction").value(hasItem(DEFAULT_DIRECTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGameOrder() throws Exception {
        // Initialize the database
        gameOrderRepository.saveAndFlush(gameOrder);

        // Get the gameOrder
        restGameOrderMockMvc.perform(get("/api/game-orders/{id}", gameOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameOrder.getId().intValue()))
            .andExpect(jsonPath("$.direction").value(DEFAULT_DIRECTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGameOrder() throws Exception {
        // Get the gameOrder
        restGameOrderMockMvc.perform(get("/api/game-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameOrder() throws Exception {
        // Initialize the database
        gameOrderRepository.saveAndFlush(gameOrder);

        int databaseSizeBeforeUpdate = gameOrderRepository.findAll().size();

        // Update the gameOrder
        GameOrder updatedGameOrder = gameOrderRepository.findById(gameOrder.getId()).get();
        // Disconnect from session so that the updates on updatedGameOrder are not directly saved in db
        em.detach(updatedGameOrder);
        updatedGameOrder
            .direction(UPDATED_DIRECTION);

        restGameOrderMockMvc.perform(put("/api/game-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameOrder)))
            .andExpect(status().isOk());

        // Validate the GameOrder in the database
        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeUpdate);
        GameOrder testGameOrder = gameOrderList.get(gameOrderList.size() - 1);
        assertThat(testGameOrder.getDirection()).isEqualTo(UPDATED_DIRECTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGameOrder() throws Exception {
        int databaseSizeBeforeUpdate = gameOrderRepository.findAll().size();

        // Create the GameOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameOrderMockMvc.perform(put("/api/game-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameOrder)))
            .andExpect(status().isBadRequest());

        // Validate the GameOrder in the database
        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGameOrder() throws Exception {
        // Initialize the database
        gameOrderRepository.saveAndFlush(gameOrder);

        int databaseSizeBeforeDelete = gameOrderRepository.findAll().size();

        // Get the gameOrder
        restGameOrderMockMvc.perform(delete("/api/game-orders/{id}", gameOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GameOrder> gameOrderList = gameOrderRepository.findAll();
        assertThat(gameOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameOrder.class);
        GameOrder gameOrder1 = new GameOrder();
        gameOrder1.setId(1L);
        GameOrder gameOrder2 = new GameOrder();
        gameOrder2.setId(gameOrder1.getId());
        assertThat(gameOrder1).isEqualTo(gameOrder2);
        gameOrder2.setId(2L);
        assertThat(gameOrder1).isNotEqualTo(gameOrder2);
        gameOrder1.setId(null);
        assertThat(gameOrder1).isNotEqualTo(gameOrder2);
    }
}
