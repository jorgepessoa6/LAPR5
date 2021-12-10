using System.Collections.Generic;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.Trips
{
    public interface ITripRepository : IRepository<Trip, TripId>
    {
        Task<List<Trip>> GetAllOfLineAsync(string desc);

        Task<List<Trip>> getTripsWithoutWorkBlock();

        Task<List<PassingTime>> GetPassingTimes(string desc);

        Task<List<Trip>> getTripsOfKey(string key);
       
    }
}