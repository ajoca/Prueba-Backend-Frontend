<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        Log::info('GET /tasks', ['filters' => $request->all()]);

        $query = Task::query();
        if ($request->has('completed')) { 
            $query->where('completed', $request->completed); 
        }
        if ($request->has('name')) {      
            $query->where('name','LIKE','%'.$request->name.'%'); 
        }

        $tasks = $query->orderBy('id','desc')->get();
        Log::info('Tasks listed', ['count' => $tasks->count()]);

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        Log::info('POST /tasks', ['payload' => $request->all()]);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'completed' => 'boolean'
        ]);

        $task = Task::create($data);
        Log::info('Task created', $task->toArray());

        return response()->json($task, 201);
    }

    public function show($id)
    {
        Log::info('GET /tasks/{id}', ['id' => $id]);
        return response()->json(Task::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        Log::info('PUT /tasks/{id}', ['id' => $id, 'payload' => $request->all()]);

        $task = Task::findOrFail($id);
        $data = $request->validate([
            'name' => 'string|max:255',
            'completed' => 'boolean'
        ]);

        $task->update($data);
        Log::info('Task updated', $task->toArray());

        return response()->json($task);
    }

    public function destroy($id)
    {
        Log::info('DELETE /tasks/{id}', ['id' => $id]);

        $task = Task::findOrFail($id);
        $task->delete();
        Log::info('Task deleted', ['id' => $id]);

        return response()->json(['message' => 'Task deleted']);
    }
}
