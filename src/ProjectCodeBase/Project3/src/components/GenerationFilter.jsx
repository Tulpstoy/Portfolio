import PropTypes from 'prop-types';
import '../styles/GenerationFilter.css';

function GenerationFilter({ currentGen, onGenChange, currentSpecialForm, onSpecialFormChange }) {
  const generations = [
    { id: 'all', label: 'All' },
    { id: '1', label: 'Gen 1' },
    { id: '2', label: 'Gen 2' },
    { id: '3', label: 'Gen 3' },
    { id: '4', label: 'Gen 4' },
    { id: '5', label: 'Gen 5' },
    { id: '6', label: 'Gen 6' },
    { id: '7', label: 'Gen 7' },
    { id: '8', label: 'Gen 8' },
    { id: '9', label: 'Gen 9' },
  ];

  const specialForms = [
    { id: 'normal', label: 'Normal', icon: '🔵' },
    { id: 'mega', label: 'Mega', icon: '⭐' },
    { id: 'gmax', label: 'Gigantamax', icon: '☁️' },
    { id: 'alola', label: 'Alolan', icon: '🌺' },
    { id: 'galar', label: 'Galarian', icon: '⚔️' },
    { id: 'hisui', label: 'Hisuian', icon: '🎌' },
    { id: 'paldea', label: 'Paldean', icon: '🌟' },
  ];

  return (
    <div className="filter-container">
      <div className="generation-filter">
        <h3>Generation:</h3>
        <div className="generation-buttons">
          {generations.map(gen => (
            <button
              key={gen.id}
              className={`gen-button ${currentGen === gen.id ? 'active' : ''}`}
              onClick={() => onGenChange(gen.id)}
            >
              {gen.label}
            </button>
          ))}
        </div>
      </div>

      <div className="special-forms-filter">
        <h3>Special Forms:</h3>
        <div className="special-forms-buttons">
          {specialForms.map(form => (
            <button
              key={form.id}
              className={`form-button ${currentSpecialForm === form.id ? 'active' : ''}`}
              onClick={() => onSpecialFormChange(form.id)}
            >
              <span className="form-icon">{form.icon}</span>
              <span className="form-label">{form.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

GenerationFilter.propTypes = {
  currentGen: PropTypes.string.isRequired,
  onGenChange: PropTypes.func.isRequired,
  currentSpecialForm: PropTypes.string.isRequired,
  onSpecialFormChange: PropTypes.func.isRequired
};

export default GenerationFilter; 