stage_104 <- read_delim("GitHub/smart-js/trial-specs/mathematical-extended-with-mc/stage_104.csv", delim = ";", quote = "\\\"", escape_double = FALSE, trim_ws = TRUE)

stage_104 <- read_delim("GitHub/smart-js/trial-specs/mathematical-extended-with-mc/stage_104.csv", delim = ",", quote = "\\\"", escape_double = FALSE, trim_ws = TRUE)


write.csv(stage_104, "GitHub/smart-js/trial-specs/mathematical-extended-with-mc/adjusted/stage_104.csv", na = "", row.names = FALSE, quote = FALSE)

file_content <- readLines("GitHub/smart-js/trial-specs/mathematical-extended-with-mc/stage_123_2.csv")
writeLines(gsub('""', '"', file_content))


# Define a function to write CSV row with conditional quoting
write.csv_custom <- function(data, file, ...) {
  # Replace 'NA' with empty cells
  data[is.na(data)] <- ""
  # Open the file connection for writing
  con <- file(file, "w")
  # Write the header row with commas between column names
  writeLines(paste(names(data), collapse = ','), con)
  # Loop through rows and write to file
  for (i in 1:nrow(data)) {
    row <- data[i, ]
    # Conditionally quote cells containing commas
    row_quoted <- sapply(row, function(x) ifelse(grepl(",", x), paste0('"', x, '"'), x))
    # Write the row to file with commas
    writeLines(paste(paste(row_quoted, collapse = ",")), con)
  }
  # Close the file connection
  close(con)
}

# Save the dataset as CSV with quotes around cells containing commas
write.csv_custom(stage_123, "GitHub/smart-js/trial-specs/mathematical-extended-with-mc/stage_123_3.csv")



library(readr)

# Define a function to read and write CSV files
read_and_write_csv <- function(stage_number) {
  # Read the CSV file
  stage_data <- read_delim(
    paste0("GitHub/smart-js/trial-specs/mathematical-extended-with-mc/stage_", stage_number, ".csv"),
    delim = ";",
    quote = "\\\"",
    escape_double = FALSE,
    trim_ws = TRUE
  )
  
  # Replace 'NA' with empty cells
  stage_data[is.na(stage_data)] <- ""
  
  # Save the dataset as CSV with quotes around cells containing commas
  write.csv_custom(stage_data, paste0("GitHub/smart-js/trial-specs/mathematical-extended-with-mc/adjusted/stage_", stage_number, ".csv"))
}

# Loop through stages 123 to 155
for (stage_number in 123:155) {
  read_and_write_csv(stage_number)
}

