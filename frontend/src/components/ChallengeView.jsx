import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChallengeView = () => {
  const [challenges, setChallenges] = useState([]);
  const [validatedIds, setValidatedIds] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/challenges');
      setChallenges(response.data.challenges);
      setValidatedIds(response.data.validated);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateFlag = async (challengeId) => {
    try {
      const response = await axios.post(`/api/challenges/${challengeId}/validate`, {
        flag: flagInput
      });
      setMessage(`✅ ${response.data.message} +${response.data.points} points`);
      setValidatedIds([...validatedIds, challengeId]);
      setSelectedChallenge(null);
      setFlagInput('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Flag incorrect');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getCategoryClass = (category) => {
    const classes = {
      web: 'category-web',
      network: 'category-network',
      crypto: 'category-crypto',
      forensic: 'category-forensic',
      binary: 'category-binary'
    };
    return classes[category] || 'category-web';
  };

  const getDifficultyStars = (difficulty) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div>
      <div className="header">
        <h1>🏆 Challenges CTF</h1>
      </div>

      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`challenge-card ${validatedIds.includes(challenge.id) ? 'validated' : ''}`}
            onClick={() => !validatedIds.includes(challenge.id) && setSelectedChallenge(challenge)}
          >
            <span className={`challenge-category ${getCategoryClass(challenge.category)}`}>
              {challenge.category}
            </span>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <div className="difficulty">{getDifficultyStars(challenge.difficulty)}</div>
            <div className="points">🎯 {challenge.points} points</div>
            {validatedIds.includes(challenge.id) && <div className="validated-badge">✅ Validé</div>}
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <div className="modal-overlay" onClick={() => setSelectedChallenge(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedChallenge.title}</h2>
            <p>{selectedChallenge.description}</p>
            <div className="form-group">
              <label>Flag :</label>
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="FLAG{...}"
              />
            </div>
            <button onClick={() => handleValidateFlag(selectedChallenge.id)}>
              Valider le flag
            </button>
            <button className="close-btn" onClick={() => setSelectedChallenge(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {message && <div className="toast-message">{message}</div>}
    </div>
  );
};

export default ChallengeView;