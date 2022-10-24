<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkerContract>
 */
class WorkerContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'code' => $this->faker->bothify('#?#?#?#'),
            'salary' => $this->faker->numberBetween(4000, 9000),
            'start_at' => $this->faker->dateTimeInInterval('-6 month', '+1 month'),
            'end_at' => (rand(0, 3) > 0)
                ? null
                : $this->faker->dateTimeInInterval('-1 week', '+3 days')
        ];
    }
}
