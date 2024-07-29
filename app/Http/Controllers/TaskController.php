<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

use function Symfony\Component\Clock\now;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $tasks = Task::paginate(10);
            return response()->json($tasks, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'id_category' => 'required|exists:category,id',
            'id_user' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $data = $request->only(['title', 'content', 'id_category', 'id_user']);
            $task = Task::create($data);
            return response()->json($task, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $task = Task::findOrFail($id);
            return response()->json($task, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'content' => 'string',
            'tip' => 'string',
            'level' => 'in:easy,medium,hard',
            'id_category' => 'exists:category,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $task = Task::findOrFail($id);
            $data = $request->only(['title', 'content', 'tip', 'level', 'id_category']);
            $task->update($data);
            return response()->json($task, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function updateTaskStatus(Request $request)
{
    // Validações
    $validator = Validator::make($request->all(), [
        'id_task' => 'required|exists:tasks,id',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()->first()], 400);
    }

    try {
        $data = $request->only(['id_task']);
        $idTask = $data['id_task'];
        // Encontrar a tarefa
        $task = Task::findOrFail($idTask);

        // Verifica se a tarefa já está concluída
        if ($task-> done == 1) {
            return response()->json(['error' => 'Tarefa já concluída!'], 200);
        }

        // Atualiza a tarefa como concluída
        $task->update([
            'done' => true,
            'finished_at' => now(),
        ]);

        return response()->json(['success' => 'Tarefa concluída com sucesso!'], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
            return response()->json(['success' => 'Tarefa deletada com sucesso.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
