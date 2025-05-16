import './stats.css';

const Stats = ({ department }) => {
    console.log("Department:", department);
    return (
        <div class="stats-grid">
                <div class="stat-card bg-blue">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total in Queue</h3>
                        <p id="totalQueueCount">0</p>
                        <div class="stat-trend up">
                            <i class="fas fa-arrow-up"></i> 12%
                        </div>
                    </div>
                </div>
                <div class="stat-card bg-green">
                    <div class="stat-icon">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Served Today</h3>
                        <p id="servedCount">0</p>
                        <div class="stat-trend up">
                            <i class="fas fa-arrow-up"></i> 5%
                        </div>
                    </div>
                </div>
                <div class="stat-card bg-orange">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Avg. Wait Time</h3>
                        <p id="avgWaitTime">0 min</p>
                        <div class="stat-trend down">
                            <i class="fas fa-arrow-down"></i> 8%
                        </div>
                    </div>
                </div>
                <div class="stat-card bg-red">
                    <div class="stat-icon">
                        <i class="fas fa-ambulance"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Emergencies</h3>
                        <p id="emergencyCount">0</p>
                        <div class="stat-trend up">
                            <i class="fas fa-arrow-up"></i> 15%
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Stats;