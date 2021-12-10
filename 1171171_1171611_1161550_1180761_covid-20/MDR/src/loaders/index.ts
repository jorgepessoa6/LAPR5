import config from '../config';
import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';
import Logger from './logger';
import mongooseLoader from './mongoose';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const lineSchema = {
    // compare with the approach followed in repos and services
    name: 'Line',
    schema: '../persistence/schemas/lineSchema',
  };

  
  const nodeSchema = {
    // compare with the approach followed in repos and services
    name: 'Node',
    schema: '../persistence/schemas/nodeSchema',
  };

  const pathSchema = {
    // compare with the approach followed in repos and services
    name: 'Path',
    schema: '../persistence/schemas/pathSchema',
  };
  const driverSchema = {
    // compare with the approach followed in repos and services
    name: 'Driver',
    schema: '../persistence/schemas/driverSchema',
  };

  const vehicleTypeSchema = {
    // compare with the approach followed in repos and services
    name: 'VehicleType',
    schema: '../persistence/schemas/vehicleTypeSchema',
  };
  const tripResultSchema = {
    // compare with the approach followed in repos and services
    name: 'TripResult',
    schema: '../persistence/schemas/tripResultSchema',
  };

  const nodeController = {
    name: config.controller.node.name,
    path: config.controller.node.path
  }

  const lineController = {
    name: config.controller.line.name,
    path: config.controller.line.path
  }

  const driverController = {
    name: config.controller.driver.name,
    path: config.controller.driver.path
  }

  const vehicleTypeController = {
    name: config.controller.vehicleType.name,
    path: config.controller.vehicleType.path
  }

  const nodeRepo = {
    name: config.repos.node.name,
    path: config.repos.node.path
  }

  const lineRepo = {
    name: config.repos.line.name,
    path: config.repos.line.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const driverRepo = {
    name: config.repos.driver.name,
    path: config.repos.driver.path
  }

  const vehicleTypeRepo = {
    name: config.repos.vehicleType.name,
    path: config.repos.vehicleType.path
  }
  
  const nodeService = {
    name: config.services.node.name,
    path: config.services.node.path
  }

  const lineService = {
    name: config.services.line.name,
    path: config.services.line.path
  }

  const pathController = {
    name: config.controller.path.name,
    path: config.controller.path.path
  }

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  }
  const fileImportService = {
    name: config.services.fileImport.name,
    path: config.services.fileImport.path
  }
  const fileImportController = {
    name: config.controller.fileImport.name,
    path: config.controller.fileImport.path
  }

  const driverService = {
    name: config.services.driver.name,
    path: config.services.driver.path
  }

  const vehicleTypeService = {
    name: config.services.vehicleType.name,
    path: config.services.vehicleType.path
  }
  const TripResultService = {
    name: config.services.tripResult.name,
    path: config.services.tripResult.path
  }
  const TripResultController = {
    name: config.controller.tripResult.name,
    path: config.controller.tripResult.path
  }
  const TripResultRepo = {
    name: config.repos.tripResult.name,
    path: config.repos.tripResult.path
  }
  

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      nodeSchema,
      pathSchema,
      driverSchema,
      vehicleTypeSchema,
      lineSchema,
      tripResultSchema
    ],
    controllers: [
      nodeController,
      pathController,
      lineController,
      driverController, //Pedro Barroso dei fix a um erro que tinhas aqui!
      vehicleTypeController,
      fileImportController,
      TripResultController
    ],
    repos: [
      nodeRepo,
      userRepo,
      pathRepo,
      driverRepo,
      vehicleTypeRepo,
      lineRepo,
      TripResultRepo
    ],
    services: [
      
      nodeService,
      pathService,
      driverService,
      vehicleTypeService,
      lineService,
      fileImportService,
      TripResultService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
