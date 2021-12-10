using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using MDV.Domain.Shared;
using MDV.Infrastructure.Trips;

namespace MDV.Domain.Trips
{
    public class TripService 
    {
        private readonly ITripRepository _repo;

        private readonly IUnitOfWork _unitofWork;

        public TripService(IUnitOfWork unitOfWork, ITripRepository repo)
        {
            this._unitofWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<TripDTO>> AddAsync(TripMapper[] dto)
        {
            var tripDTOs = new List<TripDTO>();

            for (int i = 0; i < dto.Length; i++)
            {

                var tripService = new Trip(dto[i].Key, dto[i].IsEmpty, dto[i].Orientation, dto[i].LineKey, dto[i].Path, dto[i].IsGenerated, dto[i].PassingTime);
                               await this._repo.AddAsync(tripService);

                await this._unitofWork.CommitAsync();

                tripDTOs.Add(new TripDTO(tripService.Id.AsGuid(), tripService.Key, tripService.IsEmpty, tripService.Orientation, tripService.LineKey, tripService.Path, tripService.IsGenerated, tripService.PassingTime));

            }

            return tripDTOs;

        }

        public async Task<TripDTO> AddHocAsync(TripMapper dto)
        {

            var trip = new Trip(dto.Key, dto.IsEmpty, dto.Orientation, dto.LineKey, dto.Path, dto.IsGenerated, dto.PassingTime);

            await this._repo.AddAsync(trip);

            await this._unitofWork.CommitAsync();

            return new TripDTO(trip.Id.AsGuid(),trip.Key,trip.IsEmpty, trip.Orientation, trip.LineKey, trip.Path, trip.IsGenerated, trip.PassingTime);

        }


        public async Task<TripDTO> GetByIdAsync(TripId id)
        {
            var vs = await this._repo.GetByIdAsync(id);

            if (vs == null)
                return null;

            return new TripDTO(vs.Id.AsGuid(), vs.Key, vs.IsEmpty, vs.Orientation, vs.LineKey, vs.Path, vs.IsGenerated, vs.PassingTime);
        }
        
        public async Task<Trip> getTripsOfKey(string id)
        {
            var vs = await this._repo.getTripsOfKey(id);

            if (vs == null)
                return null;

            return vs[0];
        }
        

        public async Task<List<TripDTO>> GetAllTrips()
        {
            var vs = await this._repo.GetAllAsync();

            if (vs == null)
                return null;

            var listDTOs = new List<TripDTO>();
            foreach (var item in vs)
            {
                var dto = new TripDTO(item.Id.AsGuid(), item.Key, item.IsEmpty, item.Orientation, item.LineKey, item.Path, item.IsGenerated, item.PassingTime);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        
        public async Task<List<TripDTO>> GetAllOfLineAsync(string id)
        {
            var vs = await this._repo.GetAllOfLineAsync(id);

            if (vs == null)
                return null;

            var listDTOs = new List<TripDTO>();
            foreach (var item in vs)
            {
                var dto = new TripDTO(item.Id.AsGuid(), item.Key, item.IsEmpty, item.Orientation, item.LineKey, item.Path, item.IsGenerated, item.PassingTime);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        public async Task<List<TripDTO>> getTripsWithoutWorkBlock()
        {
            var vs = await this._repo.getTripsWithoutWorkBlock();

            if (vs == null)
                return null;
        
            var listDTOs = new List<TripDTO>();
            foreach (var item in vs)
            {
                var dto = new TripDTO(item.Id.AsGuid(), item.Key, item.IsEmpty, item.Orientation, item.LineKey, item.Path, item.IsGenerated, item.PassingTime);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        public async Task<List<PassingTime>> getPassigTimes(string desc)
        {
            var vs = await this._repo.GetPassingTimes(desc);

            if (vs == null)
                return null;
        
            var listDTOs = new List<PassingTime>();
            foreach (var item in vs)
            {
                var dto = new PassingTime(item.Key, item.Time, item.Node, item.IsUsed, item.IsReliefPoint);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }
    }
}