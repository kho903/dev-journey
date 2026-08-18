const environments = [
  {
    id: 1,
    name: "Production",
    isActive: true,
    services: [
      {
        id: 101,
        name: "Backend",
        technology: "Spring Boot",
        ports: [8081, 8082],
        isHealthy: true,
      },
      {
        id: 102,
        name: "Database",
        technology: "MySQL",
        ports: [3306],
        isHealthy: true,
      },
      {
        id: 103,
        name: "Cache",
        technology: "Redis",
        ports: [6379],
        isHealthy: false,
      },
    ],
  },
  {
    id: 2,
    name: "Development",
    isActive: false,
    services: [
      {
        id: 201,
        name: "Backend",
        technology: "Spring Boot",
        ports: [8080],
        isHealthy: true,
      },
      {
        id: 202,
        name: "Frontend",
        technology: "React",
        ports: [5173],
        isHealthy: true,
      },
    ],
  },
];

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="panel-content">{children}</div>
    </section>
  );
}

function Service({ name, technology, ports, isHealthy }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{technology}</p>
      <p>Ports</p>
      <ul>
        {ports.map((port) => {
          return <li key={port}>{port}</li>;
        })}
      </ul>
      <p>{isHealthy ? "Healthy" : "Unhealthy"}</p>
      {!isHealthy && <button>Restart</button>}
    </section>
  );
}

function Environment({ name, isActive, services }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{isActive ? "Active Environment" : "Inactive Environment"}</p>
      {services.map((service) => {
        return (
          <Service
            key={service.id}
            name={service.name}
            technology={service.technology}
            ports={service.ports}
            isHealthy={service.isHealthy}
          />
        );
      })}
    </section>
  );
}

function DeploymentDashboardMission() {
  return (
    <section>
      <Panel title="Environments">
        {environments.map((environment) => {
          return (
            <Environment
              key={environment.id}
              name={environment.name}
              isActive={environment.isActive}
              services={environment.services}
            />
          );
        })}
      </Panel>
    </section>
  );
}

export default DeploymentDashboardMission;
