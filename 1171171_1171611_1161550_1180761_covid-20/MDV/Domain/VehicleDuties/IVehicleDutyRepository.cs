using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.VehicleDuties
{
    public interface IVehicleDutyRepository: IRepository<VehicleDuty,VehicleDutyId>
    {
        Task<List<VehicleDuty>> GetAllVDAsync();
    }
}