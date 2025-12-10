import React, { useState, useEffect } from 'react';
import { Check, Trash2, Edit2, X, Plus, CheckCircle2, Circle, Calendar, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';

const TaskTracker = () => {
  // ==================== STATE MANAGEMENT ====================
  const [showHomepage, setShowHomepage] = useState(true);

  // FIX APPLIED: Load tasks immediately when the app starts (Lazy Initialization)
  // This guarantees tasks are loaded BEFORE the app tries to save anything.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // ==================== SAVE TASKS TO LOCALSTORAGE ====================
  // This runs every time 'tasks' changes to keep localStorage updated
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ==================== TASK FUNCTIONS ====================
  const addTask = () => {
    if (inputValue.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === '') return;
    
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editValue } : task
    ));
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  // ==================== FILTER FUNCTIONS ====================
  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  // ==================== HOMEPAGE COMPONENT ====================
  if (showHomepage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
        
        {/* ========== ANIMATED BACKGROUND ELEMENTS ========== */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* ========== MAIN CONTENT CONTAINER ========== */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          
          {/* ========== NAVIGATION BAR ========== */}
          <nav className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-400" size={32} />
              <span className="text-2xl font-bold text-white">TaskFlow</span>
            </div>
            <button 
              onClick={() => setShowHomepage(false)}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </button>
          </nav>

          {/* ========== HERO SECTION ========== */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="text-blue-400" size={16} />
              <span className="text-blue-300 text-sm font-medium">Simple & Powerful Task Management</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Organize Your Life,
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                One Task at a Time
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Stay productive and focused with our intuitive task tracker. Manage your daily tasks, track progress, and achieve your goals effortlessly.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setShowHomepage(false)}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center gap-3 shadow-2xl"
            >
              Start Tasking
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ========== FEATURES SECTION ========== */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            
            {/* Feature Card 1 - Stay Organized */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Stay Organized</h3>
              <p className="text-gray-300 leading-relaxed">
                Keep all your tasks in one place. Add, edit, and organize with ease.
              </p>
            </div>

            {/* Feature Card 2 - Boost Productivity */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Boost Productivity</h3>
              <p className="text-gray-300 leading-relaxed">
                Track your progress with smart filters and real-time statistics.
              </p>
            </div>

            {/* Feature Card 3 - Never Lose Data */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Never Lose Data</h3>
              <p className="text-gray-300 leading-relaxed">
                Your tasks are automatically saved and synced to your browser.
              </p>
            </div>
          </div>

          {/* ========== FOOTER CTA SECTION ========== */}
          <div className="text-center mt-24">
            <p className="text-gray-400 mb-6 text-lg">Join thousands of productive people</p>
            <button
              onClick={() => setShowHomepage(false)}
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2 transition-colors text-lg"
            >
              Get Started Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== TASK TRACKER PAGE ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="relative overflow-hidden">
        
        {/* ========== GRADIENT OVERLAY ========== */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-slate-900"></div>
        
        {/* ========== MAIN CONTENT ========== */}
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          
          {/* ========== BACK TO HOME BUTTON ========== */}
          <div className="mb-8">
            <button
              onClick={() => setShowHomepage(true)}
              className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2 font-medium"
            >
              ← Back to Home
            </button>
          </div>

          {/* ========== HEADER SECTION ========== */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <CheckCircle2 className="text-blue-400" size={16} />
              <span className="text-blue-300 text-sm font-medium">Productivity Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Task Tracker
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Organize your life, one task at a time. Simple, elegant, and powerful task management.
            </p>
          </div>

          {/* ========== ADD TASK INPUT SECTION ========== */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What needs to be done today?"
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={addTask}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  <Plus size={20} />
                  Add Task
                </button>
              </div>
            </div>
          </div>

          {/* ========== STATISTICS CARDS ========== */}
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-8">
            
            {/* Total Tasks Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2">{tasks.length}</div>
              <div className="text-gray-300 text-sm font-medium">Total Tasks</div>
            </div>
            
            {/* Completed Tasks Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{completedCount}</div>
              <div className="text-gray-300 text-sm font-medium">Completed</div>
            </div>
            
            {/* Pending Tasks Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">{pendingCount}</div>
              <div className="text-gray-300 text-sm font-medium">Pending</div>
            </div>
          </div>

          {/* ========== FILTER TABS ========== */}
          <div className="max-w-3xl mx-auto mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-2 inline-flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'pending'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'completed'
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* ========== TASKS LIST CONTAINER ========== */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Empty State */}
              {filteredTasks.length === 0 ? (
                <div className="p-16 text-center">
                  <Circle className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-xl text-gray-300 mb-2">No tasks yet</p>
                  <p className="text-gray-400">Add your first task to get started!</p>
                </div>
              ) : (
                
                /* ========== TASKS LIST ========== */
                <div className="divide-y divide-white/10">
                  {filteredTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="p-5 hover:bg-white/5 transition-all group"
                    >
                      
                      {/* ========== EDIT MODE ========== */}
                      {editingId === task.id ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="p-3 text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                            title="Save"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Cancel"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        
                        /* ========== DISPLAY MODE ========== */
                        <div className="flex items-center gap-4">
                          
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleComplete(task.id)}
                            className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                              task.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-400 hover:border-blue-400 hover:bg-blue-400/10'
                            }`}
                          >
                            {task.completed && <Check size={16} className="text-white" />}
                          </button>
                          
                          {/* Task Content */}
                          <div className="flex-1">
                            <span
                              className={`text-lg ${
                                task.completed
                                  ? 'line-through text-gray-400'
                                  : 'text-white'
                              }`}
                            >
                              {task.text}
                            </span>
                            
                            {/* Date */}
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {new Date(task.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEdit(task.id, task.text)}
                              className="p-2.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ========== FOOTER ========== */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Built with React • Data saved automatically with localStorage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;