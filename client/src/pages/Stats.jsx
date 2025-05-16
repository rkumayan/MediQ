import { useEffect , useState} from 'react';
import './stats.css';

const Stats = ({ department }) => {
    console.log("Department:", department);
    const [emergencyCount, setEmergencyCount] = useState(0);

    useEffect(() => {
        let cnt = 0;
        for (let i = 0; i < department?.queueMembers?.length || 0; i++) {
            if (department.queueMembers[i].priority === 'emergency') {
                cnt++;
            }
        }
        setEmergencyCount(cnt);
    }, [department]);
    return (
        <div className="stats-grid">
                <div className="stat-card bg-blue">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Total in Queue</h3>
                        <p id="totalQueueCount"> {department.queueMembers?.length || 0}</p>
                        
                    </div>
                </div>
                <div className="stat-card bg-green">
                    <div className="stat-icon">
                        <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Served Today</h3>
                        <p id="servedCount">0</p>
                        
                    </div>
                </div>
                <div className="stat-card bg-orange">
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Avg. Wait Time</h3>
                        <p id="avgWaitTime"> { department.averageWaitTime || 0} min</p>
                        
                    </div>
                </div>
                <div className="stat-card bg-red">
                    <div className="stat-icon">
                        <i className="fas fa-ambulance"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Emergencies</h3>
                        <p id="emergencyCount">{emergencyCount}</p>

                    </div>
                </div>
            </div>
    );
}

export default Stats;