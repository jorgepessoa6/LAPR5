using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.DriverDuties
{
    public interface IDriverDutyRepository: IRepository<DriverDuty,DriverDutyId>
    {
        Task<List<DriverDuty>> GetAllDDAsync();
        
    }
}