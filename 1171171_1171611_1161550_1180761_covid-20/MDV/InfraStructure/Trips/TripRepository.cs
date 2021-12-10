using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MDV.Domain.Trips;
using MDV.Infrastructure.Shared;



namespace MDV.Infrastructure.Trips
{
    public class TripRepository : BaseRepository<Trip, TripId>, ITripRepository
    {
        private readonly MDVDbContext context;
        public TripRepository(MDVDbContext context) : base(context.Trips)
        {
            this.context = context;
        }

        public async Task<List<Trip>> GetAllOfLineAsync(string desc)
        {
            return await this.context.Trips.Where(o => o.LineKey.Equals(desc)).ToListAsync();
        }

        public async Task<List<Trip>> getTripsWithoutWorkBlock()
        {
            return await this.context.Trips.FromSqlRaw("SELECT t.* FROM [dbo].[Trips] t  left Join [dbo].[TripWorkBlock] twb on t.id=twb.tripsId where twb.tripsId is  null").ToListAsync();
        }
        public async Task<List<Trip>> getTripsOfKey(string key)
        {
            return await this.context.Trips.FromSqlRaw("SELECT t.*  FROM [dbo].[Trips] t where [key] ='" + key + "'").ToListAsync();
        }


        public async Task<List<PassingTime>> GetPassingTimes(string desc)
        {
            return await this.context.PassingTimes.FromSqlRaw("SELECT p.* FROM [dbo].[Trips] t JOIN [dbo].[PassingTimes] p ON t.id= p.tripId  where t.id = '" + desc + "' ").ToListAsync();
        }

                public  void Update(Trip m)
        {
            this.context.Trips.Attach(m);
            this.context.Entry(m).State = EntityState.Modified;
        }
        
    }
}