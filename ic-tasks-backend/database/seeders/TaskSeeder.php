<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::create(['name' => 'Comprar pan',               'completed' => false]);
        Task::create(['name' => 'Leer un libro',             'completed' => true ]);
        Task::create(['name' => 'Estudiar Laravel',          'completed' => false]);
        Task::create(['name' => 'Probar React + Tailwind',   'completed' => true ]);
        Task::create(['name' => 'Implementar tests',         'completed' => false]);
    }
}
