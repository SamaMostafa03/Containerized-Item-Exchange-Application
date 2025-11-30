provider "aws" {}

terraform {
	required_providers {
		aws = {
	    version = "~> 6.23.0"
		}
  }
}
