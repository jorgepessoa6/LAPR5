using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MDV.Domain.Trips;
using MDV.Infrastructure.Shared;
using MDV.Domain.WorkBlocks;
using MDV.Domain.VehicleDuties;

namespace MDV.Infrastructure.WorkBlocks
{
    public class WorkBlockRepository : BaseRepository<WorkBlock, WorkBlockId>, IWorkBlockRepository
    {
        private readonly MDVDbContext context;
        public WorkBlockRepository(MDVDbContext context) : base(context.WorkBlocks)
        {
            this.context = context;
        }

        public async Task<List<WorkBlock>> GetContiguousOfVehicleService(int time, string id)
        {
            List<VehicleDuty> aa = await this.context.VehicleDuties.FromSqlRaw("SELECT vd.* FROM [dbo].[VehicleDuties] vd  Inner Join [dbo].[WorkBlocks] w On vd.Id = w.VehicleDutyId and w.Id ='" +id +"'").ToListAsync();
            return await this.context.WorkBlocks.FromSqlRaw("SELECT w.* FROM [dbo].[WorkBlocks] w WHERE w.startTime = " + time + "and w.VehicleDutyId ='" + aa[0].Id.AsString()  + "'").ToListAsync();
        }
        public async Task<List<WorkBlock>> GetContiguousWorkBlock(int desc)
        {
            return await this.context.WorkBlocks.FromSqlRaw("SELECT w.* FROM [dbo].[WorkBlocks] w WHERE w.startTime = " + desc).ToListAsync();
        }
        public async Task<List<WorkBlock>> getWorkBlocksOfKey(string key)
        {
            return await this.context.WorkBlocks.FromSqlRaw("SELECT t.*  FROM [dbo].[WorkBlocks] t where [key] ='" + key + "'").ToListAsync();
        }


        public void Update(WorkBlock m)
        {
            this.context.Attach(m);
            this.context.Entry(m).State = EntityState.Modified;
        }

    }
}