import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';  // 
import { sampleProducts } from '../data/sampleProducts'; 