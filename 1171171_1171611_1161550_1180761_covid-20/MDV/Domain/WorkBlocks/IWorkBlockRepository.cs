using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.WorkBlocks
{
    public interface IWorkBlockRepository: IRepository<WorkBlock,WorkBlockId>
    {
        Task<List<WorkBlock>> GetContiguousWorkBlock(int desc);
        Task<List<WorkBlock>> getWorkBlocksOfKey(string key);
        Task<List<WorkBlock>> GetContiguousOfVehicleService(int time, string id);
    }
}