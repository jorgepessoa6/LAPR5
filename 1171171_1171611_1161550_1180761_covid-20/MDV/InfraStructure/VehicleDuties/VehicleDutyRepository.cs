using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using MDV.Domain.Trips;
using MDV.Domain.VehicleDuties;
using MDV.Domain.WorkBlocks;
using MDV.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDV.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
        private readonly MDVDbContext context;
        public VehicleDutyRepository(MDVDbContext context) : base(context.VehicleDuties)
        {
            this.context = context;
        }
      public async Task<List<VehicleDuty>> GetAllVDAsync()
        {

            List<WorkBlock> lstTemp = new List<WorkBlock>();
   
            List<VehicleDuty> lstDD = await this.context.VehicleDuties.FromSqlRaw("SELECT t.* FROM [dbo].[VehicleDuties] t").ToListAsync();
            foreach (var item2 in lstDD)
            {
                List<WorkBlock> lstWb = await this.context.WorkBlocks.FromSqlRaw("SELECT t.* FROM [dbo].[WorkBlocks] t where t.VehicleDutyId ='" + item2.Id.AsString() + "'").ToListAsync();
                item2.WorkBlock=lstWb;
            }
            return lstDD;
        }


    }
}