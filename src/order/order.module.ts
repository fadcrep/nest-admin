import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderItem]),
      CommonModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
