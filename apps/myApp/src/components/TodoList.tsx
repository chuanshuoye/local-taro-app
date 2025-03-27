import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { Button, Card } from '@local-taro-app/ui-components';
import { formatDate } from '@local-taro-app/utils';
import useTodoStore, { Todo } from '../store/useTodoStore';
import './TodoList.scss';

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodoStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const renderTodoItem = (todo: Todo) => (
    <View className="todo-item" key={todo.id}>
      <View 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => toggleTodo(todo.id)}
      >
        <Text>{todo.text}</Text>
      </View>
      <Button 
        type="danger" 
        size="small"
        onClick={() => removeTodo(todo.id)}
      >
        删除
      </Button>
    </View>
  );

  const today = formatDate(new Date());

  return (
    <Card 
      title="待办事项列表" 
      description={`今天是 ${today}`}
      className="todo-card"
    >
      <View className="todo-container">
        <View className="todo-header">
          <Input 
            className="todo-input"
            value={newTodo}
            onInput={(e) => setNewTodo(e.detail.value)}
            placeholder="添加新的待办事项"
          />
          <Button 
            type="primary" 
            className="add-btn"
            onClick={handleAddTodo}
          >
            添加
          </Button>
        </View>

        <View className="todo-list">
          {todos.length > 0 ? (
            todos.map(renderTodoItem)
          ) : (
            <Text className="empty-tip">暂无待办事项</Text>
          )}
        </View>

        {todos.length > 0 && (
          <View className="todo-footer">
            <Text className="todo-count">
              总计: {todos.length} 项, 已完成: {todos.filter(t => t.completed).length} 项
            </Text>
            <Button 
              size="small"
              onClick={clearCompleted}
            >
              清除已完成
            </Button>
          </View>
        )}
      </View>
    </Card>
  );
};

export default TodoList; 