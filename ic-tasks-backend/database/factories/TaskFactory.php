<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition()
    {
        return [
            'name'      => $this->faker->sentence,
            'completed' => $this->faker->boolean
        ];
    }
}
