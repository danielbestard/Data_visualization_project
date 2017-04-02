# Read in the data
library(readr)
flights <- as.data.frame(read_csv("flights.csv"))

# Create the date variable
flights$date <- paste(as.character(flights$YEAR), as.character(flights$MONTH), as.character(flights$DAY), sep="-")
flights$date <- as.Date(flights$date, format="%Y-%m-%d")

# Variables used in the spiral histogram
date <- names(table(flights$date))
value <- as.numeric(table(flights$date))
paste(value,collapse=", ")
relative_value <- value-min(value)
paste(relative_value,collapse=", ")
min(value)
date[which.min(value)]
