using System;
using MDV.Domain.Shared;

namespace MDV.Domain.Trips
{


    public class PassingTime : Entity<PassingTimeId>
    {
        public string Key { get; private set; }

        public int Time { get; private set; }

        public string Node { get; private set; }

        public bool IsUsed { get; private set; }

        public bool IsReliefPoint { get; private set; }


        private PassingTime()
        {
            // this.Active = true;
        }

        public PassingTime(string key, int time, string node, bool isUsed, bool isReliefPoint)
        {
            if (time == 0 | node == null)
                throw new BusinessRuleValidationException("Parâmetros em falta! Cada Viagem necessita de todos os campos preenchidos!");
            this.Id = new PassingTimeId(Guid.NewGuid());
            this.Key = key;
            this.Time = time;
            this.Node = node;
            this.IsUsed = isUsed;
            this.IsReliefPoint = isReliefPoint;
        }

    }
}