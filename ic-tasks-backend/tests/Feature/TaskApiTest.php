<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_list()
    {
        Task::factory()->count(3)->create();
        $this->getJson('/api/tasks')->assertStatus(200)->assertJsonCount(3);
    }

    public function test_create()
    {
        $this->postJson('/api/tasks',['name'=>'Prueba','completed'=>false])
             ->assertStatus(201)
             ->assertJsonFragment(['name'=>'Prueba']);
    }

    public function test_update()
    {
        $task = Task::factory()->create();
        $this->putJson("/api/tasks/$task->id",['completed'=>true])
             ->assertJsonFragment(['completed'=>true]);
    }

    public function test_delete()
    {
        $task = Task::factory()->create();
        $this->deleteJson("/api/tasks/$task->id")->assertStatus(200);
        $this->assertDatabaseMissing('tasks',['id'=>$task->id]);
    }
}
