using MDV.Domain.Vehicles;
using MDV.Infrastructure.Shared;


namespace MDV.Infrastructure.Vehicles
{
    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>,IVehicleRepository
    {
        public VehicleRepository(MDVDbContext context):base(context.Vehicles)
        {
           
        }
    }
}