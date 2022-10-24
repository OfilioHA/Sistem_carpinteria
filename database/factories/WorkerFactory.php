<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Worker>
 */
class WorkerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'code' => $this->faker->numerify('########'),
            'identification' => strtoupper($this->faker->bothify('2##-######-####?')),
            'birthday' => $this->faker->dateTimeInInterval('-40 years', '-18 years'),
            'direction' => $this->faker->address(),
            'email' => $this->faker->unique()->email()
        ];
    }
}
