using System;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Trips;

namespace MDV.Domain.WorkBlocks
{
    public class WorkBlock : Entity<WorkBlockId>, IAggregateRoot
    {
        public string key { get; private set; }
        public int startTime { get; private set; }
        public int endTime { get; private set; }
        public string startNode { get; private set; }
        public string endNode { get; private set; }
        public bool isCrewTravelTime { get; private set; }
        public bool isActive { get; private set; }
        public List<Trip> trips { get; private set; }

        private WorkBlock()
        {
        }

        public WorkBlock(string key, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            if (trips == null)
                throw new BusinessRuleValidationException("Cada bloco de trabalho requer pelo menos uma viagem");
            this.Id = new WorkBlockId(Guid.NewGuid());
            this.key = key;
            this.startTime = startTime;
            this.endTime = endTime;
            this.startNode = startNode;
            this.endNode = endNode;
            this.isCrewTravelTime = isCrewTravelTime;
            this.isActive = isActive;
            this.trips = trips;
        }

        public WorkBlock(string id,string key, int startTime, int endTime, string startNode, string endNode, bool isCrewTravelTime, bool isActive, List<Trip> trips)
        {
            if (trips == null)
                throw new BusinessRuleValidationException("Cada bloco de trabalho requer pelo menos uma viagem");
            this.Id = new WorkBlockId(Guid.Parse(id));
            this.key = key;
            this.startTime = startTime;
            this.endTime = endTime;
            this.startNode = startNode;
            this.endNode = endNode;
            this.isCrewTravelTime = isCrewTravelTime;
            this.isActive = isActive;
            this.trips = trips;
        }
        
        public WorkBlock(string id)
        {
             this.Id = new WorkBlockId(id);

        }
    }
}