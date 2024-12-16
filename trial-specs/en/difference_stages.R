# script to adapt opposite stages to difference stages

library(stringr)

# Path to the directory containing your CSV files
csv_folder <- "C:/Users/zmeijer/OneDrive - UGent/Documents/PHD/lab.js/SMART/difference_stages"

# List all CSV files in the directory
csv_files <- list.files(csv_folder, pattern = "\\.csv$", full.names = TRUE)

# Function to extract the number from the file name and add 118 (last stage was 122, stage_5 + 118 = stage_123 etc.)
rename_file <- function(file_name) {
  parts <- unlist(strsplit(basename(file_name), "_"))
  number <- as.numeric(gsub("[^0-9]", "", parts[2]))
  new_name <- paste0(parts[1], "_", number + 118)
  return(new_name)
}

# Function to replace strings in CSV data
replace_strings <- function(data) {
  # Replace the desired strings in the data frame
  data <- data.frame(lapply(data, function(column) {
    column <- as.character(column)
    column <- str_replace_all(column, c("is opposite to" = "is different to",
                                        "opposite to" = "different to"))
    return(column)
  }))
  return(data)
}

# Function to read the CSV, perform string replacement, and save with the new name
convert_csv_with_new_name <- function(file) {
  # Read the CSV file
  csv_data <- read.csv(file)  # Modify loading CSV as per your file structure
  
  # Replace strings in the data
  csv_data <- replace_strings(csv_data)
  
  # Get the new name
  new_file_name <- file.path(csv_folder, paste0(rename_file(file), ".csv"))
  
  # Save with the new name
  write.csv(csv_data, new_file_name, row.names = FALSE)
}

# Apply the function to each CSV file
lapply(csv_files, convert_csv_with_new_name)
