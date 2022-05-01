import { Router } from "express";
import { authenticate, availableFor } from "../../utils";
import { Request, Response } from "express";
import { ContentDAO } from "./../../dao/content.dao.js";

const router = Router();

router.post( "/create", authenticate(), availableFor(["ADMIN", "TEACHER"]), async ( req, res ) => {
  let result;
  try {
    result = await ContentDAO.create(req.body)
    res.json( result );
  } catch (error) {
    res.status(500).json( { error } );
  }
} );

router.get( "/:id", authenticate(), availableFor(["ADMIN", "STUDENT", "TEACHER"]), async ( req, res ) => {
  let result;
  try {
    result = await ContentDAO.get( req.params.id );
    res.json( result );
  } catch ( error ) {
    res.status(500).json( { error } );
  }
} );

// @TODO: fix this, this route doesn't work...
router.get( "/list", authenticate(), availableFor(["ADMIN", "STUDENT", "TEACHER"]), async ( req, res ) => {
  let result;
  try {
    result = await ContentDAO.list();
    res.json( result );
  } catch ( error ) {
    res.status(500).json( { error } );
  }
} );

router.post( "/update", authenticate(), availableFor(["ADMIN", "TEACHER"]), async ( req, res ) => {
  let result;
  try {
    result = await ContentDAO.update( req.body.id, req.body );
    res.json( result );
  } catch ( error ) {
    res.status(500).json( { error } );
  }
} );

router.post( "/delete", authenticate(), availableFor(["ADMIN", "TEACHER"]), async ( req, res ) => {
  let result;
  try {
    result = await ContentDAO.delete(req.body.id);
    res.json( result );
  } catch ( error ) {
    res.status(500).json( { error } );
  }
} );

export default router;
