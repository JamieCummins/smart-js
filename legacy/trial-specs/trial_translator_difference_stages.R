# script to adapt opposite stages to difference stages

library(stringr)

# Path to the directory containing your CSV files
csv_folder <- "C:/Users/zmeijer/OneDrive - UGent/Documents/PHD/lab.js/SMART/difference_stages/right_number"

#Destination folder for converted csv files
destination_folder <- "C:/Users/zmeijer/OneDrive - UGent/Documents/PHD/lab.js/SMART/difference_stages/nl"

# List all CSV files in the directory
csv_files <- list.files(csv_folder, pattern = "\\.csv$", full.names = TRUE)


# Function to replace strings in CSV data
replace_strings <- function(data) {
  # Replace the desired strings in the data frame
  data <- data.frame(lapply(data, function(column) {
    column <- as.character(column)
    column <- str_replace_all(column, c("is the same as" = "is hetzelfde als",
                                        "is different to" = "is verschillend van",
                                        "the same as" = "hetzelfde als",
                                        "different to" = "verschillend van"))
    return(column)
  }))
  return(data)
}

# Function to read the CSV, perform string replacement, and save in destination folder
convert_csv <- function(file) {
  # Read the CSV file
  csv_data <- read.csv(file)  # Modify loading CSV as per your file structure
  
  # Replace strings in the data
  csv_data <- replace_strings(csv_data)
  
  # Get the file name without the path
  file_name <- basename(file)
  
  # Create the path for the new file in the destination folder
  new_file_path <- file.path(destination_folder, file_name)
  
  # Save the modified data as a new CSV file in the destination folder
  write.csv(csv_data, new_file_path)
}

# Apply the function to each CSV file
lapply(csv_files, convert_csv)
