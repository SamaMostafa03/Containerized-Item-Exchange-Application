provider "aws" {
  region = "eu-north-1"
}

terraform {
	required_providers {
		aws = {
	    version = "~> 6.23.0"
		}
  }
}
