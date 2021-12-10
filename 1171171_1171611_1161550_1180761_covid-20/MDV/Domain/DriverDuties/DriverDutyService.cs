using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Infrastructure.WorkBlocks;
using System;
using MDV.Domain.WorkBlocks;
using MDV.Infrastructure.VehicleDuties;
using MDV.Infrastructure.DriverDuties;

namespace MDV.Domain.DriverDuties
{
    public class DriverDutyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDriverDutyRepository _repo;

        private readonly IWorkBlockRepository _repoWB;

        //REFERENCIA A WORKBLOCK 
        //private readonly ICategoryRepository _repoCat;

        public DriverDutyService(IUnitOfWork unitOfWork, IDriverDutyRepository repo, IWorkBlockRepository r)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWB = r;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<DriverDutyDTO> AddAsync(DriverDutyMapper dto)
        {
            //FAZER VERIFICACAO DE WORK BLOCKS
            // await checkCategoryIdAsync(dto.CategoryId);
            List<WorkBlock> dutyWB = new List<WorkBlock>();
            foreach (var wb in dto.WorkBlocks)
            {

                if (wb != null)
                {

                    Console.Write(wb);
                    WorkBlock troll = new WorkBlock(wb);
                    WorkBlock l = this._repoWB.GetByIdAsync(troll.Id).Result;
                    dutyWB.Add(l);

                }
            }
            var driverDuty = new DriverDuty(dto.Code, dutyWB, dto.RGB);

            await this._repo.AddAsync(driverDuty);

            await this._unitOfWork.CommitAsync();

            return new DriverDutyDTO(driverDuty.Id.AsGuid(), driverDuty.Code, driverDuty.WorkBlock, driverDuty.RGB);
        }
        /*         private async Task checkCategoryIdAsync(CategoryId categoryId)
                {
                   var category = await _repoCat.GetByIdAsync(categoryId);
                   if (category == null)
                        throw new BusinessRuleValidationException("Invalid Category Id.");
                } */
        public async Task<DriverDutyDTO> GetByIdAsync(DriverDutyId id)
        {
            var dd = await this._repo.GetByIdAsync(id);

            if (dd == null)
                return null;

            return new DriverDutyDTO(dd.Id.AsGuid(), dd.Code, dd.WorkBlock, dd.RGB);
        }
        
        public async Task<List<DriverDutyDTO>> GetAllDriverDuties()
        {
            var vs = await this._repo.GetAllDDAsync();

            if (vs == null)
                return null;

            var listDTOs = new List<DriverDutyDTO>();
            foreach (var item in vs)
            {
                var dto = new DriverDutyDTO(item.Id.AsGuid(), item.Code, item.WorkBlock, item.RGB);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }
/*         public async Task<List<VehicleDutyDTO>> GetByDateAsync(DateTime id)
        {
            var vs = await this._repo.GetByDateAsync(id);

            if (vs == null)
                return null;


            var listDTOs = new List<VehicleDutyDTO>();
            foreach (var item in vs)
            {
                var dto = new VehicleDutyDTO(item.Id.AsGuid(), item.Code, item.WorkBlock);
                listDTOs.Add(dto);
            }
            return listDTOs;


        } */

    } 


}