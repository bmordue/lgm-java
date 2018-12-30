package com.lgm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lgm.domain.GameOrder;
import com.lgm.repository.GameOrderRepository;
import com.lgm.web.rest.errors.BadRequestAlertException;
import com.lgm.web.rest.util.HeaderUtil;
import com.lgm.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GameOrder.
 */
@RestController
@RequestMapping("/api")
public class GameOrderResource {

    private final Logger log = LoggerFactory.getLogger(GameOrderResource.class);

    private static final String ENTITY_NAME = "gameOrder";

    private final GameOrderRepository gameOrderRepository;

    public GameOrderResource(GameOrderRepository gameOrderRepository) {
        this.gameOrderRepository = gameOrderRepository;
    }

    /**
     * POST  /game-orders : Create a new gameOrder.
     *
     * @param gameOrder the gameOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameOrder, or with status 400 (Bad Request) if the gameOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-orders")
    @Timed
    public ResponseEntity<GameOrder> createGameOrder(@Valid @RequestBody GameOrder gameOrder) throws URISyntaxException {
        log.debug("REST request to save GameOrder : {}", gameOrder);
        if (gameOrder.getId() != null) {
            throw new BadRequestAlertException("A new gameOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameOrder result = gameOrderRepository.save(gameOrder);
        return ResponseEntity.created(new URI("/api/game-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-orders : Updates an existing gameOrder.
     *
     * @param gameOrder the gameOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameOrder,
     * or with status 400 (Bad Request) if the gameOrder is not valid,
     * or with status 500 (Internal Server Error) if the gameOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-orders")
    @Timed
    public ResponseEntity<GameOrder> updateGameOrder(@Valid @RequestBody GameOrder gameOrder) throws URISyntaxException {
        log.debug("REST request to update GameOrder : {}", gameOrder);
        if (gameOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GameOrder result = gameOrderRepository.save(gameOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-orders : get all the gameOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of gameOrders in body
     */
    @GetMapping("/game-orders")
    @Timed
    public ResponseEntity<List<GameOrder>> getAllGameOrders(Pageable pageable) {
        log.debug("REST request to get a page of GameOrders");
        Page<GameOrder> page = gameOrderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/game-orders");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /game-orders/:id : get the "id" gameOrder.
     *
     * @param id the id of the gameOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameOrder, or with status 404 (Not Found)
     */
    @GetMapping("/game-orders/{id}")
    @Timed
    public ResponseEntity<GameOrder> getGameOrder(@PathVariable Long id) {
        log.debug("REST request to get GameOrder : {}", id);
        Optional<GameOrder> gameOrder = gameOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gameOrder);
    }

    /**
     * DELETE  /game-orders/:id : delete the "id" gameOrder.
     *
     * @param id the id of the gameOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameOrder(@PathVariable Long id) {
        log.debug("REST request to delete GameOrder : {}", id);

        gameOrderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
