resource "aws_db_subnet_group" "tfer--default" {
  description = "default"
  name        = "default"
  region      = "eu-north-1"
  subnet_ids  = ["subnet-014deebf772950683", "subnet-0b015363015abd19a", "subnet-0d628fc4b6978d9e5"]
}

resource "aws_db_subnet_group" "tfer--default-vpc-0c31ec75d9cca6989" {
  description = "Created from the RDS Management Console"
  name        = "default-vpc-0c31ec75d9cca6989"
  region      = "eu-north-1"
  subnet_ids  = ["subnet-014deebf772950683", "subnet-0b015363015abd19a", "subnet-0d628fc4b6978d9e5"]
}
