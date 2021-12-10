using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;

namespace MDV.Domain.Generations
{
    public class GenerationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenerationRepository _repo;


        public GenerationService(IUnitOfWork unitOfWork, IGenerationRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<GenerationDTO> AddAsync(GenerationMapper dto)
        {
            //FAZER VERIFICACAO DE WORK BLOCKS
            // await checkCategoryIdAsync(dto.CategoryId);
            var generation = new Generation(dto.populations);

            await this._repo.AddAsync(generation);

            await this._unitOfWork.CommitAsync();

            return new GenerationDTO(generation.Id.AsGuid(), generation.populations);
        }
        /*         private async Task checkCategoryIdAsync(CategoryId categoryId)
                {
                   var category = await _repoCat.GetByIdAsync(categoryId);
                   if (category == null)
                        throw new BusinessRuleValidationException("Invalid Category Id.");
                } */
        public async Task<GenerationDTO> GetByIdAsync(GenerationId id)
        {
            var vs = await this._repo.GetByIdAsync(id);

            if (vs == null)
                return null;

            return new GenerationDTO(vs.Id.AsGuid(), vs.populations);
        }

        public async Task<List<GenerationDTO>> GetAllGenerations()
        {
            var vs = await this._repo.GetAllAsync();
            if (vs == null)
                return null;
            var listDTOs = new List<GenerationDTO>();
            foreach (var item in vs)
            {
                var dto = new GenerationDTO(item.Id.AsGuid(), item.populations);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }

        public async Task<List<Population>> GetPopulations()
        {
            var vs = await this._repo.GetPopulations();

            if (vs == null)
                return null;

            var listDTOs = new List<Population>();
            foreach (var item in vs)
            {
                var dto = new Population(item.Populations, item.Order, item.OrderGen);
                listDTOs.Add(dto);
            }
            return listDTOs;
        }
    }
}