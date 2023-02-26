import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event, EventDocument } from './event.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
  ) {}

  async insertEvent(createEventDto: CreateEventDto) {
    const event = new this.eventModel(createEventDto);
    await event.save();
    return {
      id: event.id,
      ...createEventDto,
    };
  }

  async getAllEvents() {
    const events = await this.eventModel.find().exec();
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      type: event.type,
      opacity: event.opacity
    }));
  }

  async getEventsByType(type: number) {
    const events = await this.findEventsByType(type);
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      type: event.type,
      opacity: event.opacity
    }));
  }

  async getSingleEvent(id: string) {
    const event = await this.findEvent(id);
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      type: event.type,
      opacity: event.opacity
    };
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findEvent(id);
    const { name, location, latitude, longitude, type, opacity } = updateEventDto;
    if (name) {
      event.name = name;
    }
    if (location) {
      event.location = location;
    }
    if (latitude) {
      event.latitude = latitude;
    }
    if (longitude) {
      event.longitude = longitude;
    }
    if (type) {
      event.type = type;
    }
    if (opacity) {
      event.opacity = opacity;
    }
    await event.save();
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      type: event.type,
      opacity: event.opacity
    };
  }

  async deleteEvent(id: string) {
    let result;
    try {
      result = await this.eventModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find event.');
    }
  }

  private async findEvent(id: string): Promise<EventDocument> {
    let event;
    try {
      event = await this.eventModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }
    if (!event) {
      throw new NotFoundException('Could not find event.');
    }
    return event;
  }

  private async findEventsByType(type: number): Promise<Array<EventDocument>> {
    let events;
    try {
      events = await this.eventModel.find({ type: type }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find any event.');
    }
    if (!events) {
      throw new NotFoundException('Could not find any event.');
    }
    return events;
  }
}
