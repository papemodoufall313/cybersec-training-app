import React from 'react';
import { useNavigate } from 'react-router-dom';
import Module1 from './modules/Module1';
import Module2 from './modules/Module2';
import Module3 from './modules/Module3';
import Module4 from './modules/Module4';
import Module5 from './modules/Module5';
import Module6 from './modules/Module6';
import Module7 from './modules/Module7';
import './ModuleStyles.css';

const modulesContent = {
    1: Module1,
    2: Module2,
    3: Module3,
    4: Module4,
    5: Module5,
    6: Module6,
    7: Module7
};

const ModuleContent = ({ moduleId }) => {
    const navigate = useNavigate();
    const ContentComponent = modulesContent[moduleId];

    if (!ContentComponent) {
        return <div>Module non trouvé</div>;
    }

    return (
        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Retour aux modules
            </button>
            <ContentComponent />
        </div>
    );
};

export default ModuleContent;