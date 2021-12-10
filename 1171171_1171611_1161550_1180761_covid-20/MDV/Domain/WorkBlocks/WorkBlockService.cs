using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using System;
using MDV.Domain.Trips;
using MDV.Infrastructure.Trips;
using MDV.Infrastructure.WorkBlocks;

namespace MDV.Domain.WorkBlocks
{
    public class WorkBlockService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWorkBlockRepository _repo;
        private readonly ITripRepository _repoTrip;

        //REFERENCIA A WORKBLOCK 
        //private readonly ICategoryRepository _repoCat;

        public WorkBlockService(IUnitOfWork unitOfWork, IWorkBlockRepository repo, ITripRepository repoTrip)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoTrip = repoTrip;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<List<WorkBlockDTO>> AddAsync(WorkBlockMapper[] dto)
        {
            var tripDTOs = new List<WorkBlockDTO>();

            foreach (var wb in dto)
            {
                List<Trip> tripsWB = new List<Trip>();
                foreach (var trip in wb.trips)
                {

                    if (trip != null)
                    {

                        Trip troll = new Trip(trip);
                        Trip l = this._repoTrip.GetByIdAsync(troll.Id).Result;
                        tripsWB.Add(l);

                    }
                }
                var workBlock = new WorkBlock(wb.key, wb.startTime, wb.endTime, wb.startNode, wb.endNode, wb.isCrewTravelTime, wb.isActive, tripsWB);

                await this._repo.AddAsync(workBlock);

                await this._unitOfWork.CommitAsync();

                tripDTOs.Add(new WorkBlockDTO(workBlock.Id.AsGuid(), workBlock.key, workBlock.startTime, workBlock.endTime, workBlock.startNode, workBlock.endNode, workBlock.isCrewTravelTime, workBlock.isActive, workBlock.trips));

            }
            return tripDTOs;

        }
        public async Task<WorkBlockDTO> GetByIdAsync(WorkBlockId id)
        {
            var vs = await this._repo.GetByIdAsync(id);

            if (vs == null)
                return null;

            return new WorkBlockDTO(vs.Id.AsGuid(), vs.key, vs.startTime, vs.endTime, vs.startNode, vs.endNode, vs.isCrewTravelTime, vs.isActive, vs.trips);
        }

        public async Task<List<WorkBlockDTO>> GetContiguousOfVehicleService(int time, string id)
        {
            var vs = await this._repo.GetContiguousOfVehicleService(time,id);

            if (vs == null)
                return null;


            var listDTOs = new List<WorkBlockDTO>();
            foreach (var item in vs)
            {
                var dto = new WorkBlockDTO(item.Id.AsGuid(), item.key, item.startTime, item.endTime, item.startNode, item.endNode, item.isCrewTravelTime, item.isActive, item.trips);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }
        public async Task<List<WorkBlockDTO>> GetContiguousWorkBlock(int id)
        {
            var vs = await this._repo.GetContiguousWorkBlock(id);

            if (vs == null)
                return null;


            var listDTOs = new List<WorkBlockDTO>();
            foreach (var item in vs)
            {
                var dto = new WorkBlockDTO(item.Id.AsGuid(), item.key, item.startTime, item.endTime, item.startNode, item.endNode, item.isCrewTravelTime, item.isActive, item.trips);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        public async Task<List<WorkBlockDTO>> GetAllWorkBlocks()
        {
            var vs = await this._repo.GetAllAsync();

            if (vs == null)
                return null;

            var listDTOs = new List<WorkBlockDTO>();
            foreach (var item in vs)
            {
                var dto = new WorkBlockDTO(item.Id.AsGuid(), item.key, item.startTime, item.endTime, item.startNode, item.endNode, item.isCrewTravelTime, item.isActive, item.trips);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        
        public async Task<WorkBlock> getWorkBlocksOfKey(string id)
        {
            var vs = await this._repo.getWorkBlocksOfKey(id);

            if (vs == null)
                return null;

            return vs[0];
        }
        

    }
}