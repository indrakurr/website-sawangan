"use client";

import { useState } from "react";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const PaginationComponent = ({
  totalCount,
  pageSize,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

  return (
    <Pagination.Root count={totalCount} pageSize={pageSize}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton
            aria-label="Previous Page"
            backgroundColor={"transparent"}
            _hover={{ bg: "#F4F5F6" }}
            border="none"
            _focus={{ outline: "none", boxShadow: "none" }}
            _focusVisible={{ outline: "none", boxShadow: "none" }}
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            <ArrowLeft2
              size="24"
              color="black"
              backgroundColor={"transparent"}
            />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              key={page.value}
              onClick={() => handlePageChange(page.value)}
              bg={page.value === currentPage ? "#F77E21" : "transparent"}
              color={page.value === currentPage ? "white" : "black"}
              _hover={{
                bg: page.value === currentPage ? "#F77E21" : "#F4F5F6",
              }}
              _active={{
                bg: "#F77E21",
                color: "white",
              }}
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              _focusVisible={{ outline: "none", boxShadow: "none" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton
            aria-label="Next Page"
            backgroundColor={"transparent"}
            _hover={{ bg: "#F4F5F6" }}
            border="none"
            _focus={{ outline: "none", boxShadow: "none" }}
            _focusVisible={{ outline: "none", boxShadow: "none" }}
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            <ArrowRight2 size="24" color="black" />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default PaginationComponent;
