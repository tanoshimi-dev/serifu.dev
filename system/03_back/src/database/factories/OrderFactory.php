<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'order_number' => fake()->name(),
            'item_order_number' => fake()->name(),
            'shipping_memo' => fake()->name(),
            'order_price' => fake()-> randomFloat(1, 3000, 100000),
            'total_price' => fake()-> randomFloat(1, 3000, 100000),
            'item_number' => fake()->name(),
            'item_name' => fake()->name(),
            'item_all_name' => fake()->name(),
            'quantity' => fake()-> randomFloat(1, 1, 10),
            'sales_price' => fake()-> randomFloat(1, 10, 100),
            'addressee' => fake()->name(),
            'tel' => fake()->phoneNumber(),
            'zip' => fake()->postcode(),
            'address' => fake()->address(),
            'address_detail' => fake()->secondaryAddress(),
            'payment_type' => fake()->numberBetween(1, 10),
            'payment_method' => fake()->numberBetween(1, 10),
            'payment_date' => fake()->date(),
            'reciever_country' => fake()->country(),
        ];
    }

}
