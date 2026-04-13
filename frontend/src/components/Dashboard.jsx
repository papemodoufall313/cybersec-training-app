import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [modulesRes, statsRes] = await Promise.all([
        axios.get('/api/modules'),
        axios.get('/api/progress/stats')
      ]);
      setModules(modulesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div>
      <div className="header">
        <h1>Tableau de bord</h1>
        <div className="user-info">
          <span>👋 Bienvenue !</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Modules</h3>
          <div className="stat-value">{modules.length}</div>
        </div>
        <div className="stat-card">
          <h3>Exercices complétés</h3>
          <div className="stat-value">{stats?.completed_exercises || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Points gagnés</h3>
          <div className="stat-value">{stats?.earned_points || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Progression</h3>
          <div className="stat-value">{stats?.completion_rate || 0}%</div>
        </div>
      </div>

      <div className="modules-list">
        <h2>📚 Modules de formation</h2>
        {modules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => navigate(`/module/${module.id}`)}
          >
            <div className="module-title">
              Module {module.order_position} : {module.title}
            </div>
            <div className="module-desc">{module.description}</div>
            <small>⏱️ {module.duration_hours} heures</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;