package com.lgm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lgm.domain.Game;
import com.lgm.repository.GameRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Game.
 */
@RestController
@RequestMapping("/api")
public class GameResource {

    private final Logger log = LoggerFactory.getLogger(GameResource.class);

    private static final String ENTITY_NAME = "game";

    private final GameRepository gameRepository;

    public GameResource(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    /**
     * POST  /games : Create a new game.
     *
     * @param game the game to create
     * @return the ResponseEntity with status 201 (Created) and with body the new game, or with status 400 (Bad Request) if the game has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/games")
    @Timed
    public ResponseEntity<Game> createGame(@RequestBody Game game) throws URISyntaxException {
        log.debug("REST request to save Game : {}", game);
        if (game.getId() != null) {
            throw new BadRequestAlertException("A new game cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Game result = gameRepository.save(game);
        return ResponseEntity.created(new URI("/api/games/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /games : Updates an existing game.
     *
     * @param game the game to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated game,
     * or with status 400 (Bad Request) if the game is not valid,
     * or with status 500 (Internal Server Error) if the game couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/games")
    @Timed
    public ResponseEntity<Game> updateGame(@RequestBody Game game) throws URISyntaxException {
        log.debug("REST request to update Game : {}", game);
        if (game.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Game result = gameRepository.save(game);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, game.getId().toString()))
            .body(result);
    }

    /**
     * GET  /games : get all the games.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of games in body
     */
    @GetMapping("/games")
    @Timed
    public ResponseEntity<List<Game>> getAllGames(Pageable pageable) {
        log.debug("REST request to get a page of Games");
        Page<Game> page = gameRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/games");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /games/:id : get the "id" game.
     *
     * @param id the id of the game to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the game, or with status 404 (Not Found)
     */
    @GetMapping("/games/{id}")
    @Timed
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        log.debug("REST request to get Game : {}", id);
        Optional<Game> game = gameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(game);
    }

    /**
     * DELETE  /games/:id : delete the "id" game.
     *
     * @param id the id of the game to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/games/{id}")
    @Timed
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        log.debug("REST request to delete Game : {}", id);

        gameRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
