using MDV.Domain.Shared;

namespace MDV.Domain.Vehicles
{
    public interface IVehicleRepository: IRepository<Vehicle,VehicleId>
    {
    }
}