using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using MDV.Domain.DriverDuties;
using MDV.Domain.Trips;
using MDV.Domain.VehicleDuties;
using MDV.Domain.WorkBlocks;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDV.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
        private readonly MDVDbContext context;
        public DriverDutyRepository(MDVDbContext context) : base(context.DriverDuties)
        {
            this.context = context;
        }
        public async Task<List<DriverDuty>> GetAllDDAsync()
        {

            List<WorkBlock> lstTemp = new List<WorkBlock>();
   
            List<DriverDuty> lstDD = await this.context.DriverDuties.FromSqlRaw("SELECT t.* FROM [dbo].[DriverDuties] t").ToListAsync();
            foreach (var item2 in lstDD)
            {
                List<WorkBlock> lstWb = await this.context.WorkBlocks.FromSqlRaw("SELECT t.* FROM [dbo].[WorkBlocks] t where t.DriverDutyId ='" + item2.Id.AsString() + "'").ToListAsync();
                item2.WorkBlock=lstWb;
            }
            return lstDD;
        }

    }
}