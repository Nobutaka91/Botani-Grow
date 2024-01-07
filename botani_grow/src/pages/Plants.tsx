import './Plants.scss';
import { Card } from '../views/organisms/Card';
import { ArchivedCard } from '../views/organisms/ArchivedCard';
import { PlantInfo } from '../types/plantInfo';

type PlantProps = {
  plantsData: PlantInfo[];
};

export const Plants: React.FC<PlantProps> = ({ plantsData }) => {
  console.log(plantsData);

  return (
    <div className="plants-list pt-14">
      <div className="h-screen">
        <h1 id="title">Plants</h1>
        <div className="plantCardContainer">
          {plantsData
            .filter((plant) => !plant.isArchived)
            .map((plant) => (
              <Card plant={plant} />
            ))}
        </div>
        <h1 id="archived-title">Archive</h1>
        <div className="archived-plantCardContainer">
          {plantsData.map(
            (plant) => plant.isArchived && <ArchivedCard plant={plant} />
          )}
        </div>
      </div>
    </div>
  );
};
