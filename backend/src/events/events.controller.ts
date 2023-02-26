import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async addEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.insertEvent(createEventDto);
  }

  @Get()
  async getEvents(@Query('type') type: number) {
    if (type) {
      return this.eventsService.getEventsByType(type);
    } else {
      return this.eventsService.getAllEvents();
    }
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return await this.eventsService.getSingleEvent(id);
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  async removeEvent(@Param('id') id: string) {
    await this.eventsService.deleteEvent(id);
    return null;
  }
}
