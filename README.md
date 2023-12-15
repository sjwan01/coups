# README

## Description

The project utilizes datasets from two sources:

- [Coup d'État Project (CDP)](https://clinecenter.illinois.edu/project/research-themes/democracy-and-development/coup-detat-project)
- [Rulers, Elections, and Irregular Governance dataset (REIGN)](https://oefdatascience.github.io/REIGN.github.io/menu/reign_current.html)

### The CDP Data

The CDP data, a collaborative effort by *Buddy Peyton, Joseph Bajjalieh, Dan Shalmon, Michael Martin, Jonathan Bonaguro,* and *Scott Althaus,* documents coup instances. Attributes include occurrence details, initiator type (e.g., military, rebels), coup outcome, and fate of the deposed leader. The dataset, with 981 coup instances and 22 attributes from 1945 to 2022, is updated every six months.

### The REIGN Data

Collected by *Curtis Bell, Clayton Besaw,* and *Matthew Frank,* the REIGN data covers global political leadership, regime characteristics, and electoral outcomes since January 1950. Key numerical features include leader age, tenure length, time since the last election, democratic duration, political violence level, precipitation, and coup risk. This dataset, with 137,219 observations and 41 features by January 2021, is updated periodically.

### References

Detailed data descriptions and codebooks for the [CDP](https://databank.illinois.edu/datasets/IDB-3143201) and the [REIGN](https://oefdatascience.github.io/REIGN.github.io/menu/reign_current.html) data are available. Data downloads for the [CDP](https://databank.illinois.edu/datasets/IDB-3143201) and the [REIGN](https://github.com/OEFDataScience/REIGN.github.io/blob/gh-pages/data_sets/REIGN_2021_8.csv) data are accessible.

**Note**: Due to maintenance issues, download REIGN data via their GitHub repo.

### Data Import

Datasets are saved in the `./data/raw` folder. The REIGN data, serving a supporting role, is merged with the CDP data based on `country`, `year`, and `month` keys, resulting in the `./data/merged` folder. A subset of the merged dataset is stored in the `./data/d3` folder, since we only need the `year` and `couprisk` features for the interactive graph.

### Research Plan

The merged dataset provides a comprehensive picture of political backgrounds during coups. The research plan includes:

1. **Data Exploration:** Visualizing feature distributions using various plots.
2. **Clustering:** Applying PCA for dimension reduction, drawing a biplot to identify clusters and outliers.
3. **Time Series Analysis:** Examining coup counts by government type and region over the dataset's 75-year span.

## Missing Value Analysis

Exploring missing value distribution:

Around 40% of instances have missing `couprisk` and `pctile_risk` data, while less than 10% lack majority attribute data. A heatmap reveals missing values are related to early coups in Latin America and the Caribbean.

For details, refer to [CDP Codebook](https://databank.illinois.edu/datasets/IDB-3143201) and [REIGN Codebook](https://oefdatascience.github.io/REIGN.github.io/menu/reign_current.html).



