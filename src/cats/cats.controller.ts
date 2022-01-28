import {Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, UsePipes} from "@nestjs/common";
import {CreateCatDto} from "./cats.create-cat.dto";
import {Cat} from "./cat.interface";
import {CatsService} from "./cats.service";
import {ForbiddenException} from "../exception/forbidden.exception";
import {JoiValidationPipe} from "../pipe/joivalidation.pipe";
import Joi from "joi";
import {createCatSchema} from "./cats.create-cat-schema.joi";
import {ValidationPipe} from "../pipe/validation.pipe";



@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    // @Get('ab*cd')
    // findAll(@Req() request: Request): string{
    //     return 'This action returns all cats';
    // }

    // @Get(':id')
    // findOne(@Param() params): string{
    //     console.log(params.id);
    //     return `This action returns a #${params.id} cats`;
    // }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
        return this.catsService.findOne(id);
    }


    @Get()
    async findAll() : Promise<Cat[]>{
        return this.catsService.findAll();
    }

    // @Get()
    // async findAll(): Promise<Cat[]> {
    //     throw new ForbiddenException();
    //
    // }

    // @Post()
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    // async create(@Body() createCatDto: CreateCatDto) {
    //     return this.catsService.create(createCatDto);
    // }

    @Post()
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }
}