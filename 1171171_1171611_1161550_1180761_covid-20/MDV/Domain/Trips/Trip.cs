using System;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Domain.WorkBlocks;

namespace MDV.Domain.Trips
{


    public class Trip : Entity<TripId>, IAggregateRoot
    {
        public string Key { get; private set; }

        public bool IsEmpty { get; private set; }

        public Direction Orientation { get; private set; }

        public string LineKey { get; private set; }

        public string Path { get; private set; }

        public bool IsGenerated { get; private set; }

        public List<PassingTime> PassingTime { get; private set; }

        public List<WorkBlock> WorkBlocks { get; private set; }

        private Trip()
        {
            // this.Active = true;
        }

        public Trip(string key, bool isEmpty, Direction orientation, string lineKey, string path, bool isGenerated, List<PassingTime> passingTime)
        {
            if (path == null)
                throw new BusinessRuleValidationException("Parâmetros em falta! Cada Viagem necessita de todos os campos preenchidos!");
            this.Id = new TripId(Guid.NewGuid());
            this.Key = key;
            this.IsEmpty = isEmpty;
            this.Orientation = orientation;
            this.LineKey = lineKey;
            this.Path = path;
            this.IsGenerated = isGenerated;
            this.PassingTime = passingTime;
              //  this.WorlBlocks = new List<WorkBlock>();
        }

        public Trip(string tripId, string key, bool isEmpty, Direction orientation, string lineKey, string path, bool isGenerated, List<PassingTime> passingTime)
        {
            if (lineKey == null | path == null)
                throw new BusinessRuleValidationException("Parâmetros em falta! Cada Viagem necessita de todos os campos preenchidos!");
            this.Id = new TripId(tripId);

            this.Key = key;
            this.IsEmpty = isEmpty;
            this.Orientation = orientation;
            this.LineKey = lineKey;
            this.Path = path;
            this.IsGenerated = isGenerated;
            this.PassingTime = passingTime;
             //this.WorlBlocks = new List<WorkBlock>();
        }

        public Trip(string tripId)
        {

            this.Id = new TripId(tripId);

        }

    }
}