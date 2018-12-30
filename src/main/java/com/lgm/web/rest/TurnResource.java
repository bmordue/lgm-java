package com.lgm.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lgm.domain.Turn;
import com.lgm.repository.TurnRepository;
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
 * REST controller for managing Turn.
 */
@RestController
@RequestMapping("/api")
public class TurnResource {

    private final Logger log = LoggerFactory.getLogger(TurnResource.class);

    private static final String ENTITY_NAME = "turn";

    private final TurnRepository turnRepository;

    public TurnResource(TurnRepository turnRepository) {
        this.turnRepository = turnRepository;
    }

    /**
     * POST  /turns : Create a new turn.
     *
     * @param turn the turn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new turn, or with status 400 (Bad Request) if the turn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/turns")
    @Timed
    public ResponseEntity<Turn> createTurn(@Valid @RequestBody Turn turn) throws URISyntaxException {
        log.debug("REST request to save Turn : {}", turn);
        if (turn.getId() != null) {
            throw new BadRequestAlertException("A new turn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turn result = turnRepository.save(turn);
        return ResponseEntity.created(new URI("/api/turns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /turns : Updates an existing turn.
     *
     * @param turn the turn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated turn,
     * or with status 400 (Bad Request) if the turn is not valid,
     * or with status 500 (Internal Server Error) if the turn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/turns")
    @Timed
    public ResponseEntity<Turn> updateTurn(@Valid @RequestBody Turn turn) throws URISyntaxException {
        log.debug("REST request to update Turn : {}", turn);
        if (turn.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Turn result = turnRepository.save(turn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, turn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /turns : get all the turns.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of turns in body
     */
    @GetMapping("/turns")
    @Timed
    public ResponseEntity<List<Turn>> getAllTurns(Pageable pageable) {
        log.debug("REST request to get a page of Turns");
        Page<Turn> page = turnRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/turns");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /turns/:id : get the "id" turn.
     *
     * @param id the id of the turn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the turn, or with status 404 (Not Found)
     */
    @GetMapping("/turns/{id}")
    @Timed
    public ResponseEntity<Turn> getTurn(@PathVariable Long id) {
        log.debug("REST request to get Turn : {}", id);
        Optional<Turn> turn = turnRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(turn);
    }

    /**
     * DELETE  /turns/:id : delete the "id" turn.
     *
     * @param id the id of the turn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/turns/{id}")
    @Timed
    public ResponseEntity<Void> deleteTurn(@PathVariable Long id) {
        log.debug("REST request to delete Turn : {}", id);

        turnRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
